'use strict';

describe('Filter: requestHeaders', function() {
  var requestHeadersFilter;

  beforeEach(module('reposePlaygroundApp'));
  beforeEach(inject(function(_requestHeadersFilter_) {
    requestHeadersFilter = _requestHeadersFilter_;
  }));
  
  it('should be able to parse request headers', function() {
      var headerList = [
          {
              'name': 'head1',
              'value': 'val1'
          },
          {
              'name': 'head2',
              'value': 'val2'
          },
          {
              'name': '',
              'value': ''
          }
      ]
    expect(requestHeadersFilter(headerList)).toBe('head1 => val1\nhead2 => val2\n');
    expect(requestHeadersFilter([])).toBe('');
  });
});

describe('Filter: responseHeaders', function() {
  var responseHeadersFilter;

  beforeEach(module('reposePlaygroundApp'));
  beforeEach(inject(function(_responseHeadersFilter_) {
    responseHeadersFilter = _responseHeadersFilter_;
  }));
  
  it('should be able to parse response headers', function() {
      var headerList = {
          'head1': 'val1',
          'head2': 'val2',
          '':''
      }
      expect(responseHeadersFilter(headerList)).toBe('head1 => val1<br/>head2 => val2<br/>');
      expect(responseHeadersFilter([])).toBe('');
  });
});

describe('Filter: filterDirection', function() {
  var filterDirectionFilter;

  beforeEach(module('reposePlaygroundApp'));
  beforeEach(inject(function(_filterDirectionFilter_) {
    filterDirectionFilter = _filterDirectionFilter_;
  }));
  
  it('should be able to parse filter direction', function() {
      expect(filterDirectionFilter("Intrafilter Request Log")).toBe('<i class="glyphicon glyphicon-forward"></i>');
      expect(filterDirectionFilter("Intrafilter Response Log")).toBe('<i class="glyphicon glyphicon-backward"></i>');
      expect(filterDirectionFilter("Other")).toBe('I dono');
  });
});

describe('Filter: requestDirection', function() {
  var requestDirectionFilter;

  beforeEach(module('reposePlaygroundApp'));
  beforeEach(inject(function(_requestDirectionFilter_) {
    requestDirectionFilter = _requestDirectionFilter_;
  }));
  
  it('should be able to parse request direction', function() {
      expect(requestDirectionFilter(">>")).toBe('<i class="glyphicon glyphicon-forward"></i>');
      expect(requestDirectionFilter("<<")).toBe('<i class="glyphicon glyphicon-backward"></i>');
      expect(requestDirectionFilter("<Other<")).toBe('I dono');
  });
});

describe('Filter: prettify', function() {
  var prettifyFilter;

  beforeEach(module('reposePlaygroundApp'));
  beforeEach(inject(function(_prettifyFilter_) {
    prettifyFilter = _prettifyFilter_;
  }));
  
  it('should be able to prettify xml', function() {
      expect(prettifyFilter("<book><test id='1'>book</test></book>")).toBe("<book>\n    <test id='1'>book</test>\n</book>");
  });
});